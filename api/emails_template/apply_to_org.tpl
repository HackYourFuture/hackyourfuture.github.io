Hey <b><%- params.firstName %> <%- params.lastName -%></b> wants to become a student!

Here are his details:

<% for(let k in params) {%>
<%- k %>: <%- params[k] %>
<% } %>