Hey <%- params.email %> contacted us!

Here are their details:
<% for(let k in params) {%>
<%- k %>:
--
<%- params[k] %>

<% } %>