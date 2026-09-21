<?php

namespace App\Services;

use Illuminate\Http\Request;

/**
 * Identifies an anonymous reader well enough to make reactions toggle and to
 * rate-limit comments. Nothing here is stored in a form that can be turned
 * back into an address.
 */
class ReaderFingerprint
{
    public function for(Request $request): string
    {
        return hash('sha256', implode('|', [
            (string) $request->ip(),
            (string) $request->userAgent(),
            (string) config('app.key'),
        ]));
    }
}
