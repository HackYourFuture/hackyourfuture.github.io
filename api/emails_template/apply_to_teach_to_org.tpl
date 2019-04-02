A new teacher <%- params.firstName %> <%- params.lastName %>  applied!

Here are their details:
<% for(let k in params) {%>
<%- k %>:
--
<%- params[k] %>

<% } %>