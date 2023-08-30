import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const HomeFooter = () => {
  return (
    <div
      className="w-full mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300"
      style={{ backgroundColor: "#000300" }}
    >
      <div>
        <h1 className="w-full text-3xl font-bold text-[#00df9a]">IBS</h1>
        <p className="py-4">
          We're registered with the DICGC The Internet Banking System Limited,
          India (IBS India) is registered with the Deposit Insurance and Credit
          Guarantee Corporation (DICGC). Bank deposits up to INR500,000 per
          depositor are fully insured by the DICGC under the Deposit Insurance
          Scheme. Please visit the DICGC website for more information.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
          <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <div>
          <h6 className="font-medium text-gray-400">Explore</h6>
          <ul>
            <li className="py-2 text-sm">Investor Relations</li>
            <li className="py-2 text-sm">Safe Banking</li>
            <li className="py-2 text-sm">Internet Banking</li>
            <li className="py-2 text-sm">Mobile Banking</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Popular Products</h6>
          <ul>
            <li className="py-2 text-sm">Savings Accounts</li>
            <li className="py-2 text-sm">Current Accounts</li>
            <li className="py-2 text-sm">Home Loan</li>
            <li className="py-2 text-sm">Car Loan</li>
            <li className="py-2 text-sm">Gold Loan</li>
            <li className="py-2 text-sm">Fixed Deposit</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Calculators</h6>
          <ul>
            <li className="py-2 text-sm">Education Loan Calculator</li>
            <li className="py-2 text-sm">Personal Loan EMI Calculator</li>
            <li className="py-2 text-sm">Car Loan EMI Calculator</li>
            <li className="py-2 text-sm">Home Loan EMI Calculator</li>
            <li className="py-2 text-sm">SIP Calculator</li>
          </ul>
        </div>
        <div>
          <h6 className="font-medium text-gray-400">Others</h6>
          <ul>
            <li className="py-2 text-sm">Customer Care</li>
            <li className="py-2 text-sm">Notice Board</li>
            <li className="py-2 text-sm">News Room</li>
            <li className="py-2 text-sm">Online Assist</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
