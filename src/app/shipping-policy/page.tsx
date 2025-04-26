export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">Shipping Policy</h1>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
        <p>
          We're excited to get your pawsome outfits to you and your furry friend! Here’s everything you need to know about our shipping process.
        </p>

        <h2>Processing Time</h2>
        <p>
          Orders are typically processed within 1-3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
        </p>

        <h2>Shipping Rates and Estimates</h2>
        <p>
          Shipping charges for your order will be calculated and displayed at checkout. We offer several shipping options:
        </p>
        <ul>
          <li><strong>Standard Shipping:</strong> Typically arrives within 5-7 business days. Costs $5.00.</li>
          <li><strong>Expedited Shipping:</strong> Typically arrives within 2-3 business days. Costs $15.00.</li>
          <li><strong>International Shipping:</strong> Currently not available, but we hope to offer it soon!</li>
        </ul>
        <p><em>Please note: Delivery times are estimates and may vary due to carrier delays or other unforeseen circumstances.</em></p>

        <h2>Free Shipping</h2>
        <p>
          We offer free standard shipping on all orders over $75 (before tax).
        </p>

        <h2>Order Tracking</h2>
        <p>
          Once your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
        </p>
        <p>
          If you haven’t received your order within 10 days of receiving your shipping confirmation email, please contact us at <a href="mailto:support@pawsomeoutfits.com" className="text-primary hover:underline">support@pawsomeoutfits.com</a> with your name and order number, and we will look into it for you.
        </p>

        <h2>Shipping Restrictions</h2>
        <p>
          At this time, we do not ship to P.O. boxes or internationally. We only ship to addresses within the United States.
        </p>

        <h2>Damages and Issues</h2>
        <p>
          Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
        </p>

        <p>
          If you have any further questions, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
}
