Hey there a new Teacher <%- params.firstName %> <%- params.lastName %>  applied!

Here his details:
<% for(let k in params) {%>
<%- k %>:
--
<%- params[k] %>

<% } %>