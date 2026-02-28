#ifndef TME_ROUTES_PRODUCTS_H
#define TME_ROUTES_PRODUCTS_H

#include "weblib.h"

/*
 * Register product-related routes on the given router.
 *
 *   GET  /api/products      — list all products  (reads products.json)
 *   GET  /api/products/:id  — single product by id
 */
void tme_register_product_routes(router_t *router);

#endif /* TME_ROUTES_PRODUCTS_H */
