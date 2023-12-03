<?php

namespace App\Notifications\admin;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyAdmin extends Notification
{
    use Queueable;
    protected $user;
    protected $product_id;


    public function __construct(Model $user, int $product_id)
    {
        $this->user = $user;
        $this->product_id = $product_id;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }


    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line("Dear {$notifiable->name}")
            ->line("{$this->user->name} made an enquiry about {$this->product_id}")
            ->action(
                'Click to see the property',
                url("/prod_view/{$this->product_id}")
            )
            ->action(
                'Click to see the enquiry',
                url("/enquiry/{$this->product_id}/{$this->user->id}")
            )
            ->line('Please contact the user in 3 days');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'to' => $notifiable->email,
            'user_id' => $this->user->id,
            'product_id' => $this->product_id,
        ];
    }
}
