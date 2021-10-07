---
sidebar_position: 9
---

# FAQ

Frequently asked questions for Identity

## Do I need to bring my own custom domain?

Yes. For security reasons, we require you to run the Identity service on the same domain as your first-party apps. This is mainly because we use cookies for identity sessions, which [do not work across domains](https://www.ory.sh/kratos/docs/guides/multi-domain-cookies/).

## Do I need to bring my own SMTP (E-Mail) server?

Yes. We use E-Mails to send out Password Reset and Account Recovery messages. This project does not bring its own E-Mail server, so you have to provide an SMTP connection string that we can use.
