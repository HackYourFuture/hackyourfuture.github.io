<template>
  <div class="form-container">
    <div>
      <form class="form-group" @submit.prevent="submitDonation">
        <label class="donate-label">Donate</label>
        <div class="form-check">
          <input id="ideal" v-model="method" class="method-radio" type="radio" value="ideal">
          <label class="method-label" for="ideal">
            <i class="pf pf-ideal"/>
            <span class="method-text-span">Ideal</span>
          </label>
          <input
            id="creditcard"
            v-model="method"
            class="method-radio"
            type="radio"
            value="creditcard"
          >
          <label class="method-label" for="creditcard">
            <i class="pf pf-credit-card"/>
            <span class="method-text-span">Creditcard</span>
          </label>
          <input id="bitcoin" v-model="method" class="method-radio" type="radio" value="bitcoin">
          <label class="method-label last-method-label" for="bitcoin">
            <i class="pf pf-bitcoin-sign"/>
            <span class="method-text-span">Bitcoin</span>
          </label>
        </div>
        <div class="input-container">
          <label for="amount" class="amount-label">€</label>
          <input
            id="amount"
            v-model="amount"
            class="amount-input"
            type="number"
            name="amount"
            placeholder="Amount"
            required
          >
        </div>
        <input
          id="description"
          v-model="description"
          class="description-input"
          type="text"
          name="description"
          placeholder="Message"
        >
        <button class="submit-button" type="submit" name="submit">Donate</button>
      </form>
    </div>
    <div v-if="donated" class="blur-screen">
      <div v-if="donated" class="donated-ok">
        <p>Thanks For your donation</p>
        <button @click="donated = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/css/paymentfont.min.css";
const { lambdaUrl } = process.env;
const URL_DONATION_SUBMIT = `${lambdaUrl}donate`;
const URL_DONATION_STATUS = `${lambdaUrl}donation/status`;

export default {
    data: function() {
        return {
            donated: false,
            method: "",
            amount: "",
            description: ""
        };
    },
    mounted() {
        this.paymentStatus();
    },
    methods: {
        submitDonation() {
            console.log("submitting..., lambda URL = ", URL_DONATION_SUBMIT);
            fetch(URL_DONATION_SUBMIT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    method: this.method,
                    amount: this.amount,
                    description: this.description || "No message"
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
                const url = URL_DONATION_STATUS.concat("/?orderid=", orderId);
                fetch(url)
                    .then(response => response.json())
                    .then(json => {
                        if (json.message === "Donation went ok") {
                            this.donated = true;
                            return;
                        }
                    })
                    .catch(err => console.log(err));
            }
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
    width: 310px;
    position: relative;
    height: 340px;
    margin: 0 10px 0 10px;
    border-radius: 6px;

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
            padding: 0;
            vertical-align: middle;
        }
        .method-label {
            display: flex;
            font-size: 25px;
            position: relative;
            font-style: normal;
            cursor: pointer;
            margin-right: 40px;
            padding: 0;
        }
        .last-method-label {
            margin: 0;
        }

        .last-method-label i {
            padding: 1px 0 0 0;
        }

        .method-text-span {
            display: none;
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
        .description-input {
            margin-top: 10px;
            border: 2px solid rgb(219, 213, 213);
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
        }
        .submit-button {
            margin-top: 15px;
            border-radius: 6px;
            zoom: 2;
            background-color: white;
        }
    }
    .blur-screen {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
    }
    .donated-ok {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 20px;
        width: 330px;
        height: 150px;
        border: 2px solid rgb(219, 213, 213);
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.21);
        animation: fadeIn 0.5s;

        p {
            text-align: center;
            padding: 50px 5px 5px 5px;
        }

        button {
            margin: auto;
            border: 2px solid rgb(219, 213, 213);
            background-color: rgb(255, 255, 255);
            border-radius: 5px;
            padding: 5px;
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

/* desktop */
@media screen and (min-width: 340px) {
    .form-container {
        width: 350px;
    }
}

/* desktop */
@media screen and (min-width: 767px) {
    .form-container {
        width: 600px;
        .form-check {
            .method-text-span {
                display: inline-block;
            }
        }

        .donated-ok {
            top: 100px;
            left: 140px;
        }
    }
}
</style>
