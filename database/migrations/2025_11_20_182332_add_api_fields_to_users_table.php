<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('api_token')->nullable()->after('password');
            $table->integer('origen')->nullable()->after('api_token')->comment('1 = Contraseña de cuenta, 2 = Contraseña temporal');
            $table->string('grupo')->nullable()->after('origen');
            $table->char('interno_externo', 1)->nullable()->after('grupo')->comment('I = Interno, E = Externo');
            $table->string('clave_ejecutivo')->nullable()->after('interno_externo');
            $table->string('clave_empleado')->nullable()->after('clave_ejecutivo');
            $table->string('telefono')->nullable()->after('clave_empleado');
            $table->timestamp('fecha_ultimo_login')->nullable()->after('telefono');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'api_token',
                'origen',
                'grupo',
                'interno_externo',
                'clave_ejecutivo',
                'clave_empleado',
                'telefono',
                'fecha_ultimo_login',
            ]);
        });
    }
};
