<?php

namespace App\Providers;

use App\Repositories\ContactsAnonRepository;
use App\Repositories\ContactsRepository;
use App\Repositories\ContactsRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class ContactsProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $anon = config('contacts.anon_mode');
        $deps = [ContactsRepositoryInterface::class];
        if ($anon) {
            array_push($deps, ContactsAnonRepository::class);
        } else {
            array_push($deps, ContactsRepository::class);
        }
        $this->app->bind(...$deps);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
