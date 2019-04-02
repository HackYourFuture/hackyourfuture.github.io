Hey <b><%- params.firstName %> <%- params.lastName %></b> has applied to become a teacher!

Here are their details:

<% for(let k in params) { %>
<%- k %>: <%- params[k] %>
<% } %>