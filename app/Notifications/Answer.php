<?php

namespace App\Notifications;

use App\Models\Enquiry;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Answer extends Notification
{
    use Queueable;

    protected ?User $from_admin;
    protected ?string $text;
    protected ?object $initial_enquiry;
    protected ?string $initial_enquiry_date;

    public function __construct(User $from_admin, string $text, object $initial_enquiry, string $initial_enquiry_date)
    {
        $this->from_admin = $from_admin;
        $this->text = $text;
        $this->initial_enquiry = $initial_enquiry;
        $this->initial_enquiry_date = $initial_enquiry_date;
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    private function convert_datetime($datetime): string
    {
        $split = preg_split("/T|\:\d\d\.\w/", $datetime);
        unset($split[count($split) - 1]);
        $implode = implode(" ", $split);
        return $implode;
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("About your enquiry no: {$this->initial_enquiry->id}")
            ->line($this->text)
            ->action('See your property', url("/prod_view/{$this->initial_enquiry->product_id}"))
            ->line("Your enquiry:")
            ->line("Sent at: {$this->convert_datetime($this->initial_enquiry_date)}")
            ->line($this->initial_enquiry->message)
            ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'to' => $notifiable->email,
            'user_id' => $this->from_admin->id,
            'product_id' => $this->initial_enquiry->product_id
        ];
    }
}
