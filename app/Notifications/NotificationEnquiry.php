<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificationEnquiry extends Notification
{
    use Queueable;
    protected $user;
    protected $message;
    protected $product_id;

    public function __construct(Model $user, string $message, int $product_id)
    {
        $this->user = $user;
        $this->message = $message;
        $this->product_id = $product_id;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }


    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line("You have made enquiry about the property, id: {$this->product_id}")
            ->action(
                'Click to see the property you made enquiry of',
                url("/prod_view/{$this->product_id}")
            )
            ->line("We will come back to you in 3 working days.")
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'user_id' => $this->user->id,
            'email' => $this->user->email,
            'product_id' => $this->product_id,
            'message' => $this->message,
        ];
    }
}
