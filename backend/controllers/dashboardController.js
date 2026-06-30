const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getDashboard = async (req, res) => {
  try {
    // آمار کلی
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // درآمد کل
    const revenueData = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // آمار سفارش‌ها به تفکیک وضعیت
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // آمار کاربرها به تفکیک نقش
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    // محصولات کم موجود
    const lowStockProducts = await Product.find({ stock: { $lt: 5 }, isActive: true })
      .select('name stock')
      .sort({ stock: 1 });

    // محصولات غیرفعال
    const inactiveProducts = await Product.countDocuments({ isActive: false });

    // ۵ محصول آخر
    const latestProducts = await Product.find()
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name price stock isActive createdAt');

    // ۵ کاربر آخر
    const latestUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email role createdAt');

    // آمار ماه جاری
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const monthlyRevenueData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          status: { $ne: 'cancelled' },
        },
      },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const monthlyRevenue = monthlyRevenueData[0]?.total || 0;

    res.json({
      overview: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
      orders: {
        byStatus: ordersByStatus,
        monthlyOrders,
        monthlyRevenue,
      },
      products: {
        lowStock: lowStockProducts,
        inactiveCount: inactiveProducts,
        latest: latestProducts,
      },
      users: {
        byRole: usersByRole,
        latest: latestUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };