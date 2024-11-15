<?php

namespace Tests\Feature;

use App\Contracts\Services\AuthServiceContract;
use App\DTO\LoginResponseDTO;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class LoginTest extends TestCase
{
    public function test_incorrect_request_method(): void
    {
        $response = $this->getJson('/api/login');
        $response->assertStatus(Response::HTTP_METHOD_NOT_ALLOWED);
    }

    public function test_empty_request_body(): void
    {
        $response = $this->postJson('/api/login');
        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
    }

    public function test_failed_validation_on_email(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'invalid-email',
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
        $this->assertEquals('The email must be a valid email address.', $jsonResponse['data'][0]);
    }

    public function test_failed_validation_on_password(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'test@test.com',
            'password' => '',
        ]);

        $response->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        $jsonResponse = json_decode($response->getContent(), true);
        $this->assertEquals('Validation errors', $jsonResponse['message']);
        $this->assertEquals('The password field is required.', $jsonResponse['data'][0]);
    }

    public function test_successful_login(): void
    {
        $user = new User([
            'name' => 'Joe Bloggs',
            'email' => 'test@test.com',
        ]);

        $token = 'test-token-string';
        $responseDto = new LoginResponseDTO(
            user: $user,
            token: $token
        );

        $this->mock(AuthServiceContract::class, function ($mock) use ($responseDto) {
            $mock->shouldReceive('login')
                ->once()
                ->andReturn($responseDto);
        });

        $response = $this->postJson('/api/login', [
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        $response->assertStatus(Response::HTTP_OK);
        $jsonResponse = json_decode($response->getContent(), true);
        
        $this->assertEquals('Joe Bloggs', $jsonResponse['data']['user']['name']);
        $this->assertEquals('test@test.com', $jsonResponse['data']['user']['email']);
        $this->assertEquals($token, $jsonResponse['data']['token']);
    }
}
