# Prerequesites

-   cp .env.example .env
-   php artisan config:cache
-   Create DB "laravel"
-   php artisan migrate:fresh

# Routes

```
+--------+-----------+------------------------+-----------------------------+------------------------------------------------------------+------------------------------------------+
| Domain | Method    | URI                    | Name                        | Action                                                     | Middleware                               |
+--------+-----------+------------------------+-----------------------------+------------------------------------------------------------+------------------------------------------+
|        | GET|HEAD  | /                      | generated::UdOQ3Sj6spVCvQo2 | Closure                                                    | web                                      |
|        | GET|HEAD  | api/contacts           | contacts.index              | App\Http\Controllers\ContactController@index               | api                                      |
|        | POST      | api/contacts           | contacts.store              | App\Http\Controllers\ContactController@store               | api                                      |
|        | GET|HEAD  | api/contacts/{contact} | contacts.show               | App\Http\Controllers\ContactController@show                | api                                      |
|        | PUT|PATCH | api/contacts/{contact} | contacts.update             | App\Http\Controllers\ContactController@update              | api                                      |
|        | DELETE    | api/contacts/{contact} | contacts.destroy            | App\Http\Controllers\ContactController@destroy             | api                                      |
|        | GET|HEAD  | api/user               | generated::TjYGUa2WH4QEb8DV | Closure                                                    | api                                      |
|        |           |                        |                             |                                                            | App\Http\Middleware\Authenticate:sanctum |
|        | GET|HEAD  | sanctum/csrf-cookie    | generated::VvcnYGjO5PoDpmte | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show | web                                      |
+--------+-----------+------------------------+-----------------------------+------------------------------------------------------------+------------------------------------------+
```
