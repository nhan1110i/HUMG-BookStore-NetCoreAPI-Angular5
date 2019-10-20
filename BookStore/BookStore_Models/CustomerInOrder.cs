namespace BookStore_Models
{
    public class CustomerInOrder
    {
        public City City { get; set; }
        public Town Town { get; set; }
        public Customer Customer { get; set;}
        public CustomerInOrder(City city, Town town, Customer customer)
        {
            this.City = city;
            this.Town = town;
            this.Customer = customer;
        }
    }
}