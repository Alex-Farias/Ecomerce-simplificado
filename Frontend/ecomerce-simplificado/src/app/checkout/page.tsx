// src/app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

enum CheckoutStep {
  DeliveryAddress = 0,
  Payment = 1,
  Review = 2,
  Confirmation = 3,
}

interface DeliveryAddressState {
  useProfileAddress: boolean;
  street: string;
  number: string | number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentState {
  method: 'credit_card' | 'bank_transfer' | 'pix';
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.DeliveryAddress);
  const [isProcessing, setIsProcessing] = useState(false);

  // Delivery address form state
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddressState>({
    useProfileAddress: true,
    street: user?.rua || '',
    number: user?.numeroRua || '',
    complement: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Payment form state
  const [payment, setPayment] = useState<PaymentState>({
    method: 'credit_card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleDeliveryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setDeliveryAddress({
      ...deliveryAddress,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handlePaymentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value as PaymentState['method'],
    });
  };

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.Payment);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.Review);
  };

  const handlePlaceOrder = async () => {
    if (!cart) return;
    
    setIsProcessing(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      await clearCart();
      setCurrentStep(CheckoutStep.Confirmation);
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">You need to add items to your cart before checkout.</p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <ArrowLeft size={16} className="mr-2" />
          Browse Products
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please login to checkout</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to complete your purchase.</p>
        <Link
          href="/account"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const renderStepIndicator = () => {
    const steps = [
      { label: 'Delivery', step: CheckoutStep.DeliveryAddress },
      { label: 'Payment', step: CheckoutStep.Payment },
      { label: 'Review', step: CheckoutStep.Review },
      { label: 'Confirmation', step: CheckoutStep.Confirmation },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.step
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {currentStep > step.step ? (
                <CheckCircle size={16} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div
              className={`text-sm font-medium mx-2 ${
                currentStep >= step.step ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              {step.label}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-10 h-1 ${
                  currentStep > step.step ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderOrderSummary = () => {
    if (!cart) return null;

    const selectedItems = cart.items.filter(item => item.selecionado);
    const subtotal = selectedItems.reduce(
      (total: number, item: CartItem & { product: Product }) => total + item.produtoQuantidade * item.product.preco,
      0
    );
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
        
        <div className="mt-4 space-y-2">
          {selectedItems.map((item: CartItem & { product: Product }) => (
            <div key={item.idCarrinhoItem} className="flex justify-between text-sm">
              <p className="text-gray-600">
                {item.product.titulo} x {item.produtoQuantidade}
              </p>
              <p className="text-gray-900 font-medium">
                R$ {(item.produtoQuantidade * item.product.preco).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-900 font-medium">R$ {subtotal.toFixed(2)}</p>
          </div>
          
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-900 font-medium">
              {shipping === 0 ? 'Free' : `R$ ${shipping.toFixed(2)}`}
            </p>
          </div>
          
          <div className="flex justify-between text-base font-medium mt-2 pt-2 border-t border-gray-200">
            <p className="text-gray-900">Total</p>
            <p className="text-gray-900">R$ {total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderDeliveryStep = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Delivery Address</h2>
            
            <form onSubmit={handleDeliverySubmit}>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="useProfileAddress"
                    checked={deliveryAddress.useProfileAddress}
                    onChange={handleDeliveryFormChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Use my profile address
                  </span>
                </label>
              </div>
              
              {!deliveryAddress.useProfileAddress && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      value={deliveryAddress.street}
                      onChange={handleDeliveryFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-1">
                      Number
                    </label>
                    <input
                      id="number"
                      name="number"
                      type="text"
                      value={deliveryAddress.number}
                      onChange={handleDeliveryFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="complement" className="block text-sm font-medium text-gray-700 mb-1">
                      Complement
                    </label>
                    <input
                      id="complement"
                      name="complement"
                      type="text"
                      value={deliveryAddress.complement}
                      onChange={handleDeliveryFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={deliveryAddress.city}
                      onChange={handleDeliveryFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={deliveryAddress.state}
                      onChange={handleDeliveryFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      value={deliveryAddress.zipCode}
                      onChange={handleDeliveryFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <Link
                  href="/cart"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Cart
                </Link>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-1">
          {renderOrderSummary()}
        </div>
      </div>
    );
  };
  
  const renderPaymentStep = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
            
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="method"
                      value="credit_card"
                      checked={payment.method === 'credit_card'}
                      onChange={handlePaymentFormChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Credit Card
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="method"
                      value="bank_transfer"
                      checked={payment.method === 'bank_transfer'}
                      onChange={handlePaymentFormChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Bank Transfer
                    </span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="method"
                      value="pix"
                      checked={payment.method === 'pix'}
                      onChange={handlePaymentFormChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      PIX
                    </span>
                  </label>
                </div>
              </div>
              
              {payment.method === 'credit_card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      value={payment.cardNumber}
                      onChange={handlePaymentFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      value={payment.cardName}
                      onChange={handlePaymentFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      value={payment.expiryDate}
                      onChange={handlePaymentFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="MM/YY"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="text"
                      value={payment.cvv}
                      onChange={handlePaymentFormChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="123"
                    />
                  </div>
                </div>
              )}
              
              {payment.method === 'bank_transfer' && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">
                    You will receive bank transfer information after placing your order.
                  </p>
                </div>
              )}
              
              {payment.method === 'pix' && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm text-gray-600">
                    You will receive a PIX QR code after placing your order.
                  </p>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(CheckoutStep.DeliveryAddress)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Delivery
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Continue to Review
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="md:col-span-1">
          {renderOrderSummary()}
        </div>
      </div>
    );
  };
  
  const renderReviewStep = () => {
    if (!cart || !user) return null;
    
    const selectedItems = cart.items.filter(item => item.selecionado);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Review Your Order</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping Address</h3>
              <div className="text-sm text-gray-600">
                {deliveryAddress.useProfileAddress ? (
                  <p>
                    {user.rua}, {user.numeroRua}
                  </p>
                ) : (
                  <>
                    <p>{deliveryAddress.street}, {deliveryAddress.number}</p>
                    {deliveryAddress.complement && <p>{deliveryAddress.complement}</p>}
                    <p>{deliveryAddress.city}, {deliveryAddress.state}</p>
                    <p>{deliveryAddress.zipCode}</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h3>
              <div className="text-sm text-gray-600">
                {payment.method === 'credit_card' && (
                  <p>
                    Credit Card ending in {payment.cardNumber.substring(payment.cardNumber.length - 4)}
                  </p>
                )}
                {payment.method === 'bank_transfer' && <p>Bank Transfer</p>}
                {payment.method === 'pix' && <p>PIX</p>}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Items</h3>
              <div className="space-y-4">
                {selectedItems.map((item: CartItem & { product: Product }) => (
                  <div key={item.idCarrinhoItem} className="flex items-center">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                      {/* Placeholder for product image */}
                      <div className="h-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Image</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.product.titulo}</h4>
                      <p className="text-xs text-gray-500">
                        {item.produtoQuantidade} x R$ {item.product.preco.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      R$ {(item.produtoQuantidade * item.product.preco).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(CheckoutStep.Payment)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Payment
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          {renderOrderSummary()}
        </div>
      </div>
    );
  };
  
  const renderConfirmationStep = () => {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      {renderStepIndicator()}
      
      {currentStep === CheckoutStep.DeliveryAddress && renderDeliveryStep()}
      {currentStep === CheckoutStep.Payment && renderPaymentStep()}
      {currentStep === CheckoutStep.Review && renderReviewStep()}
      {currentStep === CheckoutStep.Confirmation && renderConfirmationStep()}
    </div>
  );
}