export const renderHomePage = (req, res) => {
    res.render("index", { title: "Home" });
  };
  
  export const renderAboutPage = (req, res) => {
    res.render("about", { title: "About Us" });
  };

