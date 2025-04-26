export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold text-primary md:text-4xl">Terms of Service</h1>
       <p className="mb-4 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground">
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using our website [Your Website URL] (the "Site") and the services offered by Pawsome Outfits ("we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Site or our services.
        </p>

        <h2>2. Use of the Site</h2>
        <p>
          You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to use the Site:
        </p>
        <ul>
          <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
          <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Site, or which, as determined by us, may harm us or users of the Site or expose them to liability.</li>
          <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Site, the server on which the Site is stored, or any server, computer, or database connected to the Site.</li>
        </ul>

        <h2>3. Intellectual Property Rights</h2>
        <p>
          The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Pawsome Outfits, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
         <p>
            These Terms permit you to use the Site for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site, except as follows: Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.
        </p>

        <h2>4. Products and Orders</h2>
        <p>
          All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time. We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
        </p>
        <p>
          We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.
        </p>

        <h2>5. User Accounts</h2>
        <p>
          If you create an account on the Site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
        </p>

        <h2>6. User Content (Reviews, Comments, etc.)</h2>
        <p>
          If you submit reviews, comments, photos, or other content ("User Content"), you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Content throughout the world in any media. You represent and warrant that you own or otherwise control all of the rights to the User Content that you post; that the User Content is accurate; that use of the User Content you supply does not violate this policy and will not cause injury to any person or entity; and that you will indemnify Pawsome Outfits for all claims resulting from User Content you supply.
        </p>
        <p>
            We take no responsibility and assume no liability for any User Content posted by you or any third party.
        </p>

        <h2>7. Disclaimer of Warranties; Limitation of Liability</h2>
        <p>
          We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free.
        </p>
        <p>
            You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied.
        </p>
         <p>
            In no case shall Pawsome Outfits, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind... (Include full liability limitation clause).
        </p>


        <h2>8. Governing Law</h2>
        <p>
          These Terms and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the State of [Your State], United States, without regard to its conflict of law provisions.
        </p>

        <h2>9. Changes to Terms of Service</h2>
        <p>
          You can review the most current version of the Terms of Service at any time on this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms by posting updates and changes to our website. It is your responsibility to check our website periodically for changes.
        </p>

        <h2>10. Contact Information</h2>
        <p>
          Questions about the Terms of Service should be sent to us at <a href="mailto:support@pawsomeoutfits.com" className="text-primary hover:underline">support@pawsomeoutfits.com</a>.
        </p>
      </div>
    </div>
  );
}
