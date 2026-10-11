<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

// Ruta temporal para forzar las migraciones a Supabase desde el navegador
Route::get('/migrar-base-de-datos-supabase', function () {
    try {
        Artisan::call('migrate', ['--force' => true]);
        return '¡Tablas creadas con éxito en Supabase! 😎:<br><pre>' . Artisan::output() . '</pre>';
    } catch (\Exception $e) {
        return 'Error al migrar: ' . $e->getMessage();
    }
});