<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_and_receive_a_token(): void
    {
        User::factory()->create([
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'admin@gmail.com',
            'password' => '12345678',
        ]);

        $response->assertOk()
            ->assertJsonStructure([
                'message',
                'token',
                'user' => ['id', 'name', 'email', 'role'],
            ]);

        $this->assertNotEmpty($response->json('token'));
        $this->assertSame('user', $response->json('user.role'));
    }

    public function test_admin_login_returns_admin_role(): void
    {
        User::factory()->create([
            'name' => 'Administrador',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
            'role' => 'admin',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'admin@gmail.com',
            'password' => '12345678',
        ]);

        $response->assertOk();
        $this->assertSame('admin', $response->json('user.role'));
    }
}
