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
    protected $offer_id;


    public function __construct(Model $user, int $offer_id)
    {
        $this->user = $user;
        $this->offer_id = $offer_id;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting("Dear {$notifiable->name}")
            ->line("{$this->user->name} made an enquiry about {$this->offer_id}")
            ->action(
                'Click to see the property',
                url("/custom_prod_view/{$this->offer_id}")
            )
            ->action(
                'Click to see the enquiry',
                url("/enquiry/{$this->offer_id}/{$this->user->id}")
            )
            ->line('Please contact the user in 3 days')
            ->salutation('Regards,');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'to' => $notifiable->email,
            'user_id' => $this->user->id,
            'offer_id' => $this->offer_id,
        ];
    }
}
