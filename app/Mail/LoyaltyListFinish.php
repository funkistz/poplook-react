<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class LoyaltyListFinish extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $year;
    public $id_shop;
    public $name;
    public $url;
    /**
     * Create a new message instance.
     */
    public function __construct($email, $year, $id_shop, $url)
    {
        //
        $this->email = $email;
        $this->year = $year;
        $this->id_shop = $id_shop;
        $email_exp = explode('@', $email);
        $this->name = $email_exp[0];
        $this->url = $url;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('admin@poplook.com','api.poplook.com'),
            subject: 'Loyalty List Fetched',
        );
    
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.loyalty_finish',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
