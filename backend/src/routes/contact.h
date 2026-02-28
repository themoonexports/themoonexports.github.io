#ifndef TME_ROUTES_CONTACT_H
#define TME_ROUTES_CONTACT_H

#include "weblib.h"

/*
 * Register contact-form routes on the given router.
 *
 *   POST /api/contact  — accept a contact-form submission (JSON body)
 */
void tme_register_contact_routes(router_t *router);

#endif /* TME_ROUTES_CONTACT_H */
