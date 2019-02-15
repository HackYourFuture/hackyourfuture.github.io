Hey <b><%- params.firstName %> <%- params.lastName %></b> wants to teach!

Here are his details:

<% for(let k in params) { %>
<%- k %>: <%- params[k] %>
<% } %>