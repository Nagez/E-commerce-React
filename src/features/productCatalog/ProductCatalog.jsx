import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getDocuments } from "../../firebase/firestoreUtils";
import { Box, Select, MenuItem, Slider, TextField, Button, InputLabel, FormControl, Typography, Grid } from "@mui/material";

export default function ProductCatalog() {
  const [categoryList, setCategoryList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 9000]);
  const [titleFilter, setTitleFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState(9000); 

  // Fetch categories and products from Firestore
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching products')
      try {
        const fetchedCategories = await getDocuments("categories");
        const fetchedProducts = await getDocuments("products");

        setCategoryList(fetchedCategories);
        setProductsList(fetchedProducts);

        // Determine the maximum price from the fetched products
        const prices = fetchedProducts.map(product => product.price);
        const maxFetchedPrice = Math.max(...prices, 0);

        setMaxPrice(maxFetchedPrice); // Set the max price dynamically
        setPriceRange([0, maxFetchedPrice]); // Initialize slider with updated max price
        setFilteredProducts(fetchedProducts); // Initialize filtered list with all products
      } catch (err) {
        console.error("Error fetching data: ", err.message);
      }
    };

    fetchData();
  }, []);

  // Handle filtering logic
  const handleFilter = () => {
    let filtered = productsList;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (titleFilter) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(titleFilter.toLowerCase()));
    }

    filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

    setFilteredProducts(filtered);
  };

  // Handle clear filters
  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, maxPrice]); // Reset slider to full price range
    setTitleFilter("");
    setFilteredProducts(productsList); // Reset to full list
  };

  // Trigger filtering when filter inputs change
  useEffect(() => {
    handleFilter();
  }, [selectedCategory, priceRange, titleFilter, productsList]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Filter bar section */}
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: 2,
          width: "80%",
          backgroundColor: "#f5f5f5",
          mb: 3,
          justifyContent: "center",
        }}
      >
        {/* Category dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" gutterBottom>
            Category
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              size="small"
            >
              <MenuItem value="">All Categories</MenuItem>
              {categoryList.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Price range slider */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" gutterBottom>
            Price Range
          </Typography>
          <Box sx={{ width: "100%" }}>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={maxPrice} 
              step={1}
              size="small"
            />
          </Box>
        </Grid>

        {/* Title input */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle2" gutterBottom>
            Title
          </Typography>
          <TextField
            variant="outlined"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            size="small"
            fullWidth
          />
        </Grid>

        {/* Clear filters button */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          container
          alignItems="center" // Center vertically
          justifyContent="center" // Center horizontally
        >
          <Button
            variant="contained"
            onClick={clearFilters}
            size="small"
            sx={{ width: "80%" }} 
          >
            Clear
          </Button>
        </Grid>
      </Grid>

      {/* Display filtered products */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Typography>No products found.</Typography>
        )}
      </Box>
    </Box>
  );
}
