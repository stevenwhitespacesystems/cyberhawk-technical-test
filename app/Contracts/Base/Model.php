<?php

declare(strict_types=1);

namespace App\Contracts\Base;

use Illuminate\Database\Eloquent\MassAssignmentException;

interface Model
{
    /**
     * Fill the model with an array of attributes.
     *
     * @return static
     *
     * @throws MassAssignmentException
     */
    public function save(array $options = []);

    /**
     * Fill the model with an array of attributes.
     *
     * @return static
     *
     * @throws MassAssignmentException
     */
    public function fill(array $attributes);

    /**
     * Deletes the model document.
     *
     * @return static
     */
    public function delete();

    /**
     * Get the attributes that were changed.
     *
     * @return array
     */
    public function getChanges();

    /**
     * Get the model's original attribute values.
     *
     * @param  string|null  $key
     * @param  mixed  $default
     * @return mixed|array
     */
    public function getOriginal($key = null, $default = null);

    /**
     * Reload a fresh model instance from the database.
     *
     * @param  array|string  $with
     * @return static|null
     */
    public function fresh($with = []);
}
