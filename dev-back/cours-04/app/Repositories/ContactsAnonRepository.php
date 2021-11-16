<?php

namespace App\Repositories;

use App\Models\Contact;
use App\Repositories\ContactsRepositoryInterface;

class ContactsAnonRepository implements ContactsRepositoryInterface
{

  public function create(Contact $contact)
  {
    $contact->name = $contact->name[0] . str_repeat('*', strlen($contact->name) - 1);
    $contact->lastname = $contact->lastname[0] . str_repeat('*', strlen($contact->lastname) - 1);
    $contact->save();
    return $contact;
  }
}
