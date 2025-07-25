export function getStatusColor(status: string) {
  switch (status) {
    case 'Đang xử lý': return 'bg-yellow-100 text-yellow-800';
    case 'Đang giao hàng': return 'bg-blue-100 text-blue-800';
    case 'Đã giao hàng': return 'bg-green-100 text-green-800';
    case 'Đã hủy': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
} 