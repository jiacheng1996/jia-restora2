import Vue from 'vue'
import Router from 'vue-router'

//Website Pages
import Home from '@/components/shop/pages/Home'
import About from '@/components/shop/pages/About'
import Cart from '@/components/shop/pages/Cart'
import SignIn from '@/components/shop/pages/SignIn'
import Checkout from '@/components/shop/pages/Checkout'
import CategoryProduct from '@/components/shop/pages/CategoryProduct'
import CatProduct from '@/components/shop/pages/CatProduct'
import FeaturedProducts from '@/components/shop/pages/FeaturedProducts'
import Products from '@/components/shop/pages/Products'
import ProductDetails from '@/components/shop/pages/ProductDetails'
import CreateAccount from '@/components/shop/pages/CreateAccount'
import Account from '@/components/shop/pages/Account'
import EditAccount from '@/components/shop/pages/EditAccount'
import AccountSettings from '@/components/shop/pages/AccountSettings'
import OrderHistory from '@/components/shop/pages/OrderHistory'
import OrderDetails from '@/components/shop/pages/OrderDetails'
import Success from '@/components/shop/pages/Success'

//Dashboard
import Dashboard from '@/components/admin/dashboard/Dashboard'
//Auth
import Setup from '@/components/admin/authentication/Setup'
import SetupSuccess from '@/components/admin/authentication/Success'
//Customers
import Customers from '@/components/admin/customers/Customers'
import ViewCustomer from '@/components/admin/customers/ViewCustomer'
//Sales
import AddSales from '@/components/admin/sales/AddSales'
import Sales from '@/components/admin/sales/Sales'
import EditSales from '@/components/admin/sales/EditSales'
import SalesReport from '@/components/admin/sales/SalesReport'

// Expenses
import AddExpenses from '@/components/admin/expenses/AddExpenses'
import EditExpense from '@/components/admin/expenses/EditExpense'
import Expenses from '@/components/admin/expenses/Expenses'
import ExpenseReport from '@/components/admin/expenses/ExpenseReport'

// Orders
import Orders from '@/components/admin/orders/Orders'
import ViewOrder from '@/components/admin/orders/ViewOrder'
import OrderType from '@/components/admin/orders/OrderType'

// Stock
import AddItem from '@/components/admin/stock/AddItem'
import EditItem from '@/components/admin/stock/EditItem'
import Items from '@/components/admin/stock/Items'
import ItemCategories from '@/components/admin/stock/ItemCategories'
import AddItemCategory from '@/components/admin/stock/AddItemCategory'
import StockReport from '@/components/admin/stock/StockReport'
//Report
import Report from '@/components/admin/report/Report'
//Leads
import Leads from '@/components/admin/leads/Leads'
import AddLeads from '@/components/admin/leads/AddLeads'
import EditLeads from '@/components/admin/leads/EditLeads'
import ViewLeads from '@/components/admin/leads/ViewLeads'
import LeadsType from '@/components/admin/leads/LeadsType'
//Deliveries
import RecentDeliveries from '@/components/admin/deliveries/RecentDeliveries'
import Deliveries from '@/components/admin/deliveries/Deliveries'
import DeliveryPersons from '@/components/admin/deliveries/DeliveryPersons'
import AddDeliveryPerson from '@/components/admin/deliveries/AddDeliveryPerson'
//Support Guest
import Welcome from '@/components/admin/support/Welcome'
import Message from '@/components/admin/support/Message'
import Expired from '@/components/admin/support/Expired'
import AdminSupportList from '@/components/admin/support/AdminSupportList'
import AdminSupportMessage from '@/components/admin/support/AdminSupportMessage'
//Options
import Options from '@/components/admin/options/Options'
import AddLogo from '@/components/admin/options/AddLogo'
import Slider from '@/components/admin/options/Slider'
import AddSlider from '@/components/admin/options/AddSlider'
import Reviews from '@/components/admin/options/Reviews'
import AddReview from '@/components/admin/options/AddReview'
import Features from '@/components/admin/options/Features'
import AddFeature from '@/components/admin/options/AddFeature'

//POS
import Pos from '@/components/admin/pos/Pos'
import Tables from '@/components/admin/pos/Tables'
import PosCatProduct from '@/components/admin/pos/PosCatProduct'
import PosCategoryProduct from '@/components/admin/pos/PosCategoryProduct'
import PosCheckout from '@/components/admin/pos/Checkout'
import PosSuccess from '@/components/admin/pos/Success'

//Settings
import Settings from '@/components/admin/settings/Settings'



import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },   
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn,     
    },   
    {
      path: '/create-account',
      name: 'CreateAccount',
      component: CreateAccount,     
    },
    {
      path: '/edit-account',
      name: 'EditAccount',
      component: EditAccount,
      meta:{
        requiresAuth:true
      }     
    },
    {
      path: '/account-settings',
      name: 'AccountSettings',
      component: AccountSettings,
      meta:{
        requiresAuth:true
      }     
    },
    {
      path: '/order-history',
      name: 'OrderHistory',
      component: OrderHistory,
      meta:{
        requiresAuth:true
      }     
    },
    {
      path: '/order-details/:id',
      name: 'OrderDetails',
      component: OrderDetails,
      meta:{
        requiresAuth:true
      }
    },   
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta:{
        requiresAuth:true
      }     
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,     
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
      meta:{
        requiresAuth:true
      }     
    },
    {
      path: '/product-category/:category',
      name: 'CategoryProduct',
      component: CategoryProduct,           
    },
    {
      path: '/product-categorys/:category',
      name: 'CatProduct',
      component: CatProduct,
        
    },
    {
      path: '/featured-products',
      name: 'FeaturedProducts',
      component: FeaturedProducts,
        
    },
    {
      path: '/menu',
      name: 'Products',
      component: Products,
        
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
        
    },
    {
      path: '/admin',
      name: 'Setup',
      component: Setup
    },
    {
      path: '/setup-succss',
      name: 'SetupSuccess',
      component: SetupSuccess
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/view-customer/:id',
      name: 'ViewCustomer',
      component: ViewCustomer,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-sales',
      name: 'AddSales',
      component: AddSales,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-sales/:id',
      name: 'EditSales',
      component: EditSales,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/sales-report',
      name: 'SalesReport',
      component: SalesReport,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/sales',
      name: 'Sales',
      component:Sales,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-expenses',
      name: 'AddExpenses',
      component: AddExpenses,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/expenses-report',
      name: 'ExpenseReport',
      component: ExpenseReport,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-expenses/:id',
      name: 'EditExpense',
      component: EditExpense,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/view-order/:id',
      name: 'ViewOrder',
      component: ViewOrder,
      meta:{
        requiresAuth:true
      }
    },   
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/orders-type/:type',
      name: 'OrderType',
      component: OrderType,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddItem,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-item-category',
      name: 'AddItemCategory',
      component: AddItemCategory,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-item/:id',
      name: 'EditItem',
      component: EditItem,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/items',
      name: 'Items',
      component: Items,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/stock-report',
      name: 'StockReport',
      component: StockReport,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/item-categories',
      name: 'ItemCategories',
      component: ItemCategories,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
      meta:{
        requiresAuth:true
      }
    },  
    {
      path: '/recent-deliveries',
      name: 'RecentDeliveries',
      component: RecentDeliveries,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/deliveries',
      name: 'Deliveries',
      component: Deliveries,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/delivery-persons',
      name: 'DeliveryPersons',
      component: DeliveryPersons,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/add-delivery-person',
      name: 'AddDeliveryPerson',
      component: AddDeliveryPerson,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/add-leads',
      name: 'AddLeads',
      component: AddLeads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/leads',
      name: 'Leads',
      component: Leads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-leads/:id',
      name: 'EditLeads',
      component: EditLeads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/view-leads/:id',
      name: 'ViewLeads',
      component: ViewLeads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/leads-type/:type',
      name: 'LeadsType',
      component: LeadsType,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/message/:id',
      name: 'Message',
      component: Message,
      props:true,
      beforeEnter: (to, from, next) => {
        if(to.params.pr_name){
          next()
        }else{
          next({ name:'Expired'})
        }
      }
    },
    {
      path: '/expired',
      name: 'Expired',
      component: Expired
    },
    {
      path: '/support-list',
      name: 'AdminSupportList',
      component: AdminSupportList,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/support-message/:id',
      name: 'AdminSupportMessage',
      component: AdminSupportMessage,
      meta:{
        requiresAuth:true
      },
      beforeEnter: (to, from, next) => {
        if(to.params.id){
          next( )
        }else{
          next({ name:'AdminSupportList'})
        }
      }
    },
    {
      path: '/options',
      name: 'Options',
      component: Options,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-logo',
      name: 'AddLogo',
      component: AddLogo,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/slider',
      name: 'Slider',
      component: Slider,
      meta:{
        requiresAuth:true
      }
    },  
    {
      path: '/add-slider',
      name: 'AddSlider',
      component: AddSlider,
      meta:{
        requiresAuth:true
      }
    },  
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-review',
      name: 'AddReview',
      component: AddReview,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-feature',
      name: 'AddFeature',
      component: AddFeature,
      meta:{
        requiresAuth:true
      }
    },     
    {
      path: '/features',
      name: 'Features',
      component: Features,
      meta:{
        requiresAuth:true       
      }
    },     
    {
      path: '/tables',
      name: 'Tables',
      component: Tables,
      meta:{
        requiresAuth:true       
      }
    },     
    {
      path: '/pos',
      name: 'Pos',
      component: Pos,
      meta:{
        requiresAuth:true       
      }
    },
    {
      path: '/pos/product-category/:category',
      name: 'PosCatProduct',
      component: PosCatProduct,
      meta:{
        requiresAuth:true       
      }  
    },     
    {
      path: '/pos/checkout',
      name: 'PosCheckout',
      component: PosCheckout,
      meta:{
        requiresAuth:true       
      }  
    },     
    {
      path: '/pos/product-categorys/:category',
      name: 'PosCategoryProduct',
      component: PosCategoryProduct,
      meta:{
        requiresAuth:true       
      }  
    },
    {
      path: '/pos/success',
      name: 'PosSuccess',
      component: PosSuccess,
      meta:{
        requiresAuth:true       
      }  
    },          
  
  ]
})

router.beforeEach((to,from,next) => {
  let currentUser=firebase.auth().currentUser;
  let requiresAuth=to.matched.some(record=>record.meta.requiresAuth);


  if(requiresAuth && !currentUser) next('/')
  //else if (!requiresAuth && currentUser) next('dashboard')
  else next()
});

// Vue Meta
import Meta from 'vue-meta';
Vue.use(Meta);


export default router
