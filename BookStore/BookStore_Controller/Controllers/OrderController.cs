using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookStore_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore_Controller.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        Order order = new Order();
        Customer customer = new Customer();
        OrderDetail orderDetail = new OrderDetail();
        Product product = new Product();
        City city = new City();
        Town town = new Town();
        // GET: api/Order
        [HttpGet]
        public async Task<JsonResult> GetOrders()
        {
            List<Order> rs = await order.GetOrders();
            List<OrderInOrder> orders = new List<OrderInOrder>();
            foreach(Order order in rs)
            {
                List<ProductInOrder> productsInOrder = new List<ProductInOrder>();
                Customer customer2 = await customer.GetCustomerById(order.CustomerId);
                CustomerInOrder customerInOrder = new CustomerInOrder(await city.GetCityById(customer2.CityId), await town.GetTownById(customer2.TownId), customer2);
                List<OrderDetail> orderDetailsInOrder = await orderDetail.GetOrderDetailByOrderId(order.Id);
                
                foreach(OrderDetail orderDetail in orderDetailsInOrder)
                {
                    Product product2 = await product.GetProductById(orderDetail.ProductId);
                    productsInOrder.Add(new ProductInOrder(product2, orderDetail));
                }
                orders.Add(new OrderInOrder(customerInOrder, order, productsInOrder));
            }
            return new JsonResult(orders);
        }
        [HttpGet("{Id}")]
        public async Task<JsonResult> GetOrderById(int Id)
        {
            var orderResult = await order.GetOrderById(Id);
            List<OrderInOrder> orders = new List<OrderInOrder>();
            if (orderResult != null)
            {
                List<ProductInOrder> productsInOrder = new List<ProductInOrder>();
                Customer ctm = await customer.GetCustomerById(orderResult.CustomerId);
                CustomerInOrder customerInOrder = new CustomerInOrder(await city.GetCityById(ctm.CityId), await town.GetTownById(ctm.TownId), ctm);
                List<OrderDetail> orderDetailsInOrder = await orderDetail.GetOrderDetailByOrderId(orderResult.Id);
                foreach (OrderDetail orderDetail in orderDetailsInOrder)
                {
                    Product product2 = await product.GetProductById(orderDetail.ProductId);
                    productsInOrder.Add(new ProductInOrder(product2, orderDetail));
                }
                orders.Add(new OrderInOrder(customerInOrder, orderResult, productsInOrder));
                return new JsonResult(orders);
            }
            else
            {
                return new JsonResult(new Notice(1, "not found"));
            }
        }
        [HttpPut]
        public async Task<JsonResult> CompleteOrder(int Id)
        {
            var rs = await order.UpdateOrder(Id, 2);
            if(rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Update"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Updated"));
            }
        }
        [HttpPut]
        public async Task<JsonResult> DeclineOrder( [FromBody] int Id)
        {
            var rs = await order.UpdateOrder(Id, 3);
            if (rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Update"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Updated"));
            }
        }
        [HttpDelete("{Id}")]
        public async Task<JsonResult> DeleteOrder(int Id)
        {
            var rs = await order.DeleteOrder(Id);
            if (rs == 0)
            {
                return new JsonResult(new Notice(1, "Cant Delete"));
            }
            else
            {
                return new JsonResult(new Notice(0, "Deleted"));
            }

        }
        [HttpPost]
        public async Task<JsonResult> InsertOrder([FromBody] Order orderInsert)
        {
            var rs = await order.InsertOrder(orderInsert);
            if(rs == 0)
            {
                return new JsonResult(new Notice(0, "Inserted"));
            }
            else
            {
                return new JsonResult(new Notice(1, "Cant Insert"));
            }
        }

        // GET: api/Order/5
        
    }
}
