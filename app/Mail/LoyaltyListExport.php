<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LoyaltyListExport extends Mailable
{
    use Queueable, SerializesModels;

    public $email;
    public $file_name;
    public $name;
    /**
     * Create a new message instance.
     */
    public function __construct($email, $file_name)
    {
        $this->email = $email;
        $this->file_name = $file_name;
        $email_exp = explode('@', $email);
        $this->name = $email_exp[0];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('admin@poplook.com', 'api.poplook.com'),
            subject: 'Loyalty List Export',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.loyalty_list_export',
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
