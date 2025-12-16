"use client";

import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";

export default function DefaultModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("welcomeModalSeen");
    if (!seen) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("welcomeModalSeen", "true");
    setIsOpen(false);
  };

  return (
    <ComponentCard title="CEO Welcome Modal">
      <Button size="sm" onClick={() => setIsOpen(true)}>
        Open Welcome Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="
          max-w-[700px]
          mx-4 sm:mx-6 md:mx-auto
          p-4 sm:p-5 md:p-6 lg:p-10
        "
      >
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* CEO Image */}
          <img
            src="/images/user/owner.jpg"
            alt="CEO"
            className="
              w-16 h-16
              sm:w-20 sm:h-20
              md:w-24 md:h-24
              rounded-full
              object-cover
              shadow-lg
            "
          />

          {/* Heading */}
          <h4 className="
            font-semibold
            text-gray-800 dark:text-white/90
            text-lg sm:text-xl md:text-2xl
          ">
            Welcome to Our Platform
          </h4>

          {/* Paragraphs */}
          <div className="
            text-left
            text-gray-700 dark:text-gray-300
            text-sm sm:text-base
            leading-6 sm:leading-7
            space-y-3 sm:space-y-4
          ">
            <p>
              Dear Valued User,
              <br />
              We are thrilled to have you join our community. Our mission is to
              provide you with the best tools and services to help you succeed
              in your goals. We are committed to innovation, excellence, and
              customer satisfaction.
            </p>

            <p>
              Our team is constantly working to improve your experience. From
              new features to personalized support, we strive to make every
              interaction meaningful. Welcome aboard, and we look forward to
              achieving great things together!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm" onClick={closeModal}>
              Let's Get Started
            </Button>
          </div>
        </div>
      </Modal>
    </ComponentCard>
  );
}
