Hey <b><%- params.firstName %> <%- params.lastName %></b> has applied!

Here are their details:

<% for(let k in params) { %>
<%- k %>: <%- params[k] %>
<% } %>