import axios from "axios";
import { Request, Response } from "express";
import {
  AddToList,
  GetShoppingList,
  UpdateCheckedShoppingList,
} from "../../schemas/product_schema";
import * as express from "express";
const router = express.Router();

router.post("/products/search", async (req: Request, res: Response) => {
  const searchString = req.body.input;
  console.log("search string: ", req.body.input);
  const result = await axios.post(
    "https://external.api.coop.se/personalization/search/products?api-version=v1&store=254800&groups=CUSTOMER_PRIVATE,CUSTOMER_MEDMERA&device=desktop&direct=true",
    {
      query: searchString,
      resultsOptions: {
        skip: 0,
        take: 15,
        sortBy: [],
        facets: [],
      },
      relatedResultsOptions: {
        skip: 0,
        take: 16,
      },
      customData: {
        searchABTest: false,
        consent: true,
      },
    },
    {
      headers: {
        "Ocp-Apim-Subscription-Key": "3becf0ce306f41a1ae94077c16798187",
        "User-Id": "88908aaf-1576-4a16-adb6-df5f16782e49",
        "Content-Type": "application/json",
      },
    }
  );
  console.log("data: ", result);
  res.json(result.data.results.items);
});

router.post("/shoppinglist/add", async (req: Request, res: Response) => {
  const { product } = req.body;
  console.log("product: ", product);
  const result = await AddToList(product);
  res.send(result);
});

router.get("/shoppinglist", async (req: Request, res: Response) => {
  const result = await GetShoppingList();
  res.send(result);
});

router.post("/shoppinglist", async (req: Request, res: Response) => {
  console.log("lol: ", req.body.product);
  const result = await UpdateCheckedShoppingList(req.body.product);
  res.send(result);
});
export default router;
