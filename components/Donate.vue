<template>
  <div class="form-container">
    <div >
      <form class="form-group" @submit.prevent="submitDonation" >
        <label class="donate-label">Donate</label>
        <div class="form-check">
          <input id="ideal" v-model="method" class="method-radio" type="radio" value="ideal" checked>
          <label class="method-label" for="ideal"><i class="pf pf-ideal">Ideal</i></label>

          <input id="creditcard" v-model="method" class="method-radio" type="radio" value="creditcard" >
          <label class="method-label" for="creditcard"><i class="pf pf-credit-card">Creditcard</i></label>

          <input id="bitcoin" v-model="method" class="method-radio" type="radio" value="bitcoin" >
          <label class="method-label last" for="bitcoin"> <i class="pf pf-bitcoin-sign" >Bitcoin</i></label>
        </div>
        <div class="input-container">
          <label for="amount" class="amount-label"> €</label>
          <input v-validate="'decimal:2'" id="amount" v-model="amount" class="amount-input" type="number" name="amount" placeholder="Amount" > 
        
        </div>
        <button class="submit-button" type="submit" name="submit" >Donate</button>
      </form>
    </div>
    <div v-if="donated" class="donated-ok">
      <p>Thanks For your donation</p>
      <button @click="donated = false">Close</button>
    </div>
  </div>
</template>

<script>
import "~/assets/css/css/paymentfont.min.css";

export default {
    data: function() {
        return {
            donated: false,
            method: "",
            amount: 0,
            description: "Hello"
        };
    },
    mounted() {
        this.paymentStatus();
    },
    methods: {
        submitDonation() {
            const submitURL =
                process.env.SUBMIT_DONATION_URL ||
                "http://localhost:3005/donate";

            fetch(submitURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    method: this.method,
                    amount: this.amount,
                    description: this.description
                })
            })
                .then(res => res.json())
                .then(json => {
                    window.location = json.paymentURL;
                });
        },

        paymentStatus() {
            const orderId = this.$route.query.orderid;
            if (orderId !== undefined) {
                let donationStatusURL =
                    process.env.GET_DONATION_STATUS_URL ||
                    "http://localhost:3005/donation/status";

                donationStatusURL = donationStatusURL.concat(
                    "/?orderid=",
                    orderId
                );
                fetch(donationStatusURL)
                    .then(response => response.json())
                    .then(json => {
                        if (json.message === "Donation went ok") {
                            this.donated = true;
                            return;
                        }
                    })
                    .catch(err => console.log(err));
            } else console.log(orderId);
        }
    }
};
</script>


<style lang="scss" scoped>
* {
    box-sizing: border-box;
    overflow: hidden;
}
.form-container {
    position: relative;
    left: 250px;
    width: 590px;
    height: 300px;

    border-radius: 6px;

    .form-group {
        height: 300px;
    }

    .donate-label {
        margin-bottom: 20px;
        padding: 0;
        position: relative;
        width: calc(90% - 5px);
        font-weight: bold;
        font-size: 26px;
    }

    .form-check {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        position: relative;
        padding: 10px;
        .method-radio {
            position: relative;
            width: auto;
            zoom: 2;
            margin-top: 5px;
            padding-right: 0;
            margin-right: 0;
            vertical-align: middle;
        }
        .method-label {
            position: relative;
            font-style: normal;
            cursor: pointer;
            margin-right: 40px;
            padding: 0;
        }
        .last {
            margin: 0;
        }

        .last i {
            padding-top: 1px;
        }
    }
    .input-container {
        margin-top: 20px;
        position: relative;
        height: 50px;
        border-radius: 5px;
        background-color: rgb(219, 213, 213);
        .amount-label {
            float: left;
            width: 10%;
            height: 49px;
            position: relative;
            border: 1px solid rgb(219, 213, 213);
            background-color: rgb(219, 213, 213);
            border-radius: 5px;
            padding-top: 10px;
            margin-top: -10px;
        }
        .amount-input {
            float: left;
            width: 88%;
            margin-left: 5px;
            position: relative;
            border: 2px solid rgb(219, 213, 213);
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
        }
    }

    .form-group {
        text-align: center;
        .submit-button {
            margin-top: 15px;
            border-radius: 6px;
            zoom: 2;
        }
    }

    .donated-ok {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 10px;
        left: 20px;
        font-size: 35px;
        height: 250px;
        width: 550px;
        border: 2px solid rgb(219, 213, 213);
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
        -moz-box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
        animation: fadeIn 0.5s;

        p {
            text-align: center;
            padding: 70px 5px 5px 5px;
            height: 50%;
        }

        button {
            margin: auto;
            border: 2px solid rgb(219, 213, 213);
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            padding: 5px;
        }
    }
    @-webkit-keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
}
</style>
