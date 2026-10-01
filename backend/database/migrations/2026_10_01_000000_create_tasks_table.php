<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('owner')->nullable();
            $table->date('due_date')->nullable();
            $table->enum('priority', ['High', 'Medium', 'Low'])->default('Medium');
            $table->enum('status', ['To do', 'In progress', 'Completed'])->default('To do');
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
