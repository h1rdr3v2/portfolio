<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category', 20)->index();
            $table->text('description')->nullable();
            $table->text('story');
            $table->json('tools')->nullable();
            $table->json('links')->nullable();
            $table->json('images')->nullable();
            $table->string('year', 40);
            $table->boolean('is_featured')->default(false)->index();
            $table->unsignedSmallInteger('featured_order')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
