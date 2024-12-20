<?php

namespace Tests\Feature\Auth;

use App\Contracts\Services\AuthServiceContract;
use App\DTO\Auth\RegisterResponseDTO;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    public function test_incorrect_request_method(): void
    {
        $response = $this->getJson('/api/auth/register');
        $response->assertStatus(Response::HTTP_METHOD_NOT_ALLOWED);
    }

    public function test_empty_request_body(): void
    {
        $response = $this->postJson('/api/auth/register');
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
    }

    public function test_failed_validation_on_name(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => '',
            'email' => 'test@test.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
        $this->assertEquals('The name field is required.', $jsonResponse['data'][0]);
    }

    public function test_failed_validation_on_email(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Joe Bloggs',
            'email' => 'invalid-email',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
        $this->assertEquals('The email must be a valid email address.', $jsonResponse['data'][0]);
    }

    public function test_failed_validation_on_password(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Joe Bloggs',
            'email' => 'test@test.com',
            'password' => '',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
        $this->assertEquals('The password field is required.', $jsonResponse['data'][0]);
    }

    public function test_failed_validation_on_password_confirmation(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Joe Bloggs',
            'email' => 'test@test.com',
            'password' => 'password',
            'password_confirmation' => 'password2',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
        $this->assertEquals('The password confirmation does not match.', $jsonResponse['data'][0]);
    }

    public function test_successful_registration(): void
    {
        $user = new User([
            'name' => 'Joe Bloggs',
            'email' => 'test@test.com',
        ]);

        $token = 'test-token-string';
        $responseDto = new RegisterResponseDTO(
            user: $user,
            token: $token
        );

        $this->mock(AuthServiceContract::class, function ($mock) use ($responseDto) {
            $mock->shouldReceive('register')
                ->once()
                ->andReturn($responseDto);
        });

        $response = $this->postJson('/api/auth/register', [
            'name' => 'Joe Bloggs',
            'email' => 'test@test.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_CREATED);
        $jsonResponse = json_decode($response->getContent(), true);
        
        $this->assertEquals('Joe Bloggs', $jsonResponse['data']['user']['name']);
        $this->assertEquals('test@test.com', $jsonResponse['data']['user']['email']);
        $this->assertEquals($token, $jsonResponse['data']['token']);
    }
}
