<?php

namespace App\Notifications;

use App\Models\User;
use App\Notifications\admin\NotifyAdmin;
use App\Notifications\admin\TranslateCustomText;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Notification as FacadesNotification;

class NotificationEnquiry extends Notification
{
    use Queueable;
    protected ?User $user;
    protected ?string $message;
    protected ?int $offer_id;

    public function __construct(User $user, string $message, int $offer_id)
    {
        $this->user = $user;
        $this->message = $message;
        $this->offer_id = $offer_id;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $this->notify_admin();
        return (new MailMessage)
            ->greeting("Dear {$notifiable->name}")
            ->line("You have made enquiry about the property, id: {$this->offer_id}")
            ->action(
                'Click to see the property you made enquiry of',
                url("/custon_prod_view/{$this->offer_id}")
            )
            ->line("We will come back to you in 3 working days.")
            ->line(TranslateCustomText::translate("We will come back to you in 3 working days.")) // !!!test line!!!
            ->line('Thank you for using our application!')
            ->salutation('Regards');
    }

    private function notify_admin(): void
    {
        $users = User::where('role', 'admin')->get();
        if (!empty($users)) {
            FacadesNotification::send($users, new NotifyAdmin($this->user, $this->offer_id));
        }
    }

    public function toArray(object $notifiable): array
    {
        return [
            'to' => $notifiable->email,
            'user_id' => $this->user->id,
            'offer_id' => $this->offer_id,
            'message' => $this->message,
        ];
    }
}
