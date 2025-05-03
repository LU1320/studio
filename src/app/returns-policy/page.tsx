export default function ReturnsPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">Returns & Exchanges Policy</h1>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground">
        <p className="text-muted-foreground">
          We want you and your pup to be completely happy with your PetCouture purchase! If something isn't right, here's how we can help.
        </p>

        <h2>Eligibility</h2>
        <p className="text-muted-foreground">
          We accept returns and exchanges within <strong>30 days</strong> of the delivery date. To be eligible for a return or exchange, your item must be:
        </p>
        <ul>
          <li>Unused and in the same condition that you received it (unworn, unwashed, free of pet hair).</li>
          <li>In its original packaging with all tags attached.</li>
        </ul>
        <p className="text-muted-foreground">
          Items marked as "Final Sale" cannot be returned or exchanged.
        </p>

        <h2>How to Initiate a Return or Exchange</h2>
        <p className="text-muted-foreground">
          To start a return or exchange, please email us at <a href="mailto:returns@petcouture.com" className="text-primary hover:underline">returns@petcouture.com</a> with your order number and the reason for the return/exchange.
        </p>
        <p className="text-muted-foreground">
          We will provide you with instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
        </p>

        <h2>Refunds</h2>
        <p className="text-muted-foreground">
          Once we receive and inspect your return, we will notify you if the refund was approved or rejected. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
        </p>
        <p className="text-muted-foreground">
          Original shipping costs are non-refundable. If you receive a refund, the cost of return shipping (if applicable, see below) may be deducted from your refund.
        </p>

        <h2>Exchanges</h2>
        <p className="text-muted-foreground">
          The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item. Alternatively, let us know what item/size/color you'd like to exchange for when you email us, and we can check availability.
        </p>

        <h2>Return Shipping</h2>
        <p className="text-muted-foreground">
          Customers are responsible for return shipping costs unless the item received was incorrect or defective. We recommend using a trackable shipping service.
        </p>

         <h2>Damages and Issues</h2>
        <p className="text-muted-foreground">
          Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.
        </p>

        <p className="text-muted-foreground">
          If you have any questions concerning our return policy, please contact us at <a href="mailto:support@petcouture.com" className="text-primary hover:underline">support@petcouture.com</a>.
        </p>
      </div>
    </div>
  );
}
