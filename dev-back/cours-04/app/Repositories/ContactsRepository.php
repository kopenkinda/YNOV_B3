<?php

namespace App\Repositories;

use App\Models\Contact;
use App\Repositories\ContactsRepositoryInterface;

class ContactsRepository implements ContactsRepositoryInterface
{

  public function create(Contact $contact)
  {
    // $mode = (bool)env('ANON');
    // dump($mode);
    // if ($mode) {
    //   $contact->name = $contact->name[0] . str_repeat('*', strlen($contact->name) - 1);
    //   $contact->lastname = $contact->lastname[0] . str_repeat('*', strlen($contact->lastname) - 1);
    // } else {
    $contact->name = strtoupper($contact->name[0]) . strtolower(substr($contact->name, 1));
    $contact->lastname = strtoupper($contact->lastname[0]) . strtolower(substr($contact->lastname, 1));
    // }
    $contact->save();
    return $contact;
  }
}
