<?php

namespace App\Notifications;

use App\Models\Enquiry;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Answer extends Notification
{
    use Queueable;

    protected ?User $from_admin;
    protected ?string $text;
    protected ?object $initial_enquiry;

    public function __construct(User|Authenticatable $from_admin, string $text, object $initial_enquiry)
    {
        $this->from_admin = $from_admin;
        $this->text = $text;
        $this->initial_enquiry = $initial_enquiry;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting("Dear {$notifiable->name}")
            ->subject("About your enquiry no: {$this->initial_enquiry->id}")
            ->line($this->text)
            ->line("Information about your enquiry:")
            ->action('See your property', url("/custom_prod_view/{$this->initial_enquiry->offer_id}"))
            ->line("Your enquiry:")
            ->line("Sent at: {$this->initial_enquiry->created_at}")
            ->line($this->initial_enquiry->message)
            ->line('Thank you for using our application!')
            ->line("Regards, ")
            ->salutation($this->from_admin->name);
    }

    public function toArray(object $notifiable): array
    {
        return [
            'to' => $notifiable->email,
            'user_id' => $this->from_admin->id,
            'offer_id' => $this->initial_enquiry->offer_id
        ];
    }
}
