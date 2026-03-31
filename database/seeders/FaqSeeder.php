<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
               Faq::insert([
            [
                'id' => 1,
                'question' => 'How does delivery work?',
                'answer' => 'We offer flexible delivery slots throughout the day. Choose your preferred time during checkout, and we\'ll deliver your groceries right to your doorstep. Same-day delivery is available for orders placed before 2 PM.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'question' => 'What is your return policy?',
                'answer' => 'We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Contact our support team to initiate a return and we\'ll guide you through the process.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'question' => 'Do you have minimum order requirements?',
                'answer' => 'Yes, we have a minimum order of $20 for standard delivery. However, there is no minimum order for in-store pickup. Orders above $50 qualify for free delivery.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'question' => 'How fresh are your products?',
                'answer' => 'All our produce is sourced daily from local farms and suppliers. We prioritize freshness and quality, ensuring that perishables are restocked every morning before deliveries begin.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            [
                'id' => 5,
                'question' => 'Can I modify my order after placing it?',
                'answer' => 'You can modify your order up to 1 hour before the scheduled delivery time. Log in to your account, navigate to your active orders, and make the changes needed.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'question' => 'What payment methods do you accept?',
                'answer' => 'We accept all major credit and debit cards, PayPal, Apple Pay, Google Pay, and cash on delivery. All online transactions are secured with 256-bit encryption.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'question' => 'Do you offer subscription plans?',
                'answer' => 'Yes! Our subscription plans offer weekly or monthly deliveries at a discounted rate. Subscribers also get early access to new products and exclusive deals.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'question' => 'How do I track my order?',
                'answer' => 'Once your order is dispatched, you\'ll receive an SMS and email with a tracking link. You can also track your order in real time through your account dashboard.',
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            
        ]);
    }
}
