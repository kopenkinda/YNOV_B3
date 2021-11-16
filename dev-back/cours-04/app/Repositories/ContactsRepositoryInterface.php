<?php

namespace App\Repositories;

use App\Models\Contact;

interface ContactsRepositoryInterface
{
  public function create(Contact $contact);
}
