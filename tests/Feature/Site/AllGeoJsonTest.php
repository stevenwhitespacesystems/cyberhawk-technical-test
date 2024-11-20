<?php

namespace Tests\Feature\Auth;

use App\DTO\Auth\RegisterResponseDTO;
use App\Models\Site;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class AllGeoJsonTest extends TestCase
{
    // public function test_successful_registration(): void
    // {
    //     $site = new Site([
    //         'longitude' => 1.0,
    //         'latitude' => 1.0,
    //     ]);

    //     $token = 'test-token-string';
    //     $responseDto = new RegisterResponseDTO(
    //         user: $user,
    //         token: $token
    //     );

    //     $this->mock(AuthServiceContract::class, function ($mock) use ($responseDto) {
    //         $mock->shouldReceive('register')
    //             ->once()
    //             ->andReturn($responseDto);
    //     });

    //     $response = $this->postJson('/api/register', [
    //         'name' => 'Joe Bloggs',
    //         'email' => 'test@test.com',
    //         'password' => 'password',
    //         'password_confirmation' => 'password',
    //     ]);

    //     $response->assertStatus(Response::HTTP_CREATED);
    //     $jsonResponse = json_decode($response->getContent(), true);
        
    //     $this->assertEquals('Joe Bloggs', $jsonResponse['data']['user']['name']);
    //     $this->assertEquals('test@test.com', $jsonResponse['data']['user']['email']);
    //     $this->assertEquals($token, $jsonResponse['data']['token']);
    // }
}
