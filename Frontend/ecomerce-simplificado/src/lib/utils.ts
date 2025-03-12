// src/lib/utils.ts

// Format currency in Brazilian Real format
export const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  // Format date to Brazilian format
  export const formatDate = (date: Date | string): string => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('pt-BR');
  };
  
  // Format CPF with mask
  export const formatCPF = (cpf: string): string => {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) return cpf;
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };
  
  // Format CNPJ with mask
  export const formatCNPJ = (cnpj: string): string => {
    const cleaned = cnpj.replace(/\D/g, '');
    if (cleaned.length !== 14) return cnpj;
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };
  
  // Format phone number with mask
  export const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Get product image URL (placeholder for now)
  export const getProductImageUrl = (productId: number): string => {
    // In a real app, you would use actual product images
    return `https://placehold.co/600x400?text=Product+${productId}`;
  };
  
  // Parse JSON safely
  export const safeJsonParse = (json: string, fallback: any = {}): any => {
    try {
      return JSON.parse(json);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return fallback;
    }
  };
  
  // Validate email format
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Generate a random order number
  export const generateOrderNumber = (): string => {
    const timestamp = Date.now().toString().substring(7);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `#${timestamp}${random}`;
  };
  
  // Calculate discount percentage
  export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
    if (originalPrice <= 0) return 0;
    const discount = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discount);
  };
  
  // Check if a product is new (less than 7 days old)
  export const isNewProduct = (createdAt: string | Date): boolean => {
    const productDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    const now = new Date();
    const differenceInDays = Math.floor((now.getTime() - productDate.getTime()) / (1000 * 3600 * 24));
    return differenceInDays < 7;
  };
  
  // Debounce function for search inputs
  export const debounce = <F extends (...args: any[]) => any>(
    func: F,
    waitFor: number
  ): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    
    return (...args: Parameters<F>): void => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(...args), waitFor);
    };
  };