<template>
  <div>
    <!-- <h1>HOME PAGE1</h1> -->
    <v-row>
      <v-col>
        <v-card class="mx-auto" color="#26c6da" dark max-width="400">
          <v-card-title>
            <v-icon large left> mdi-chat </v-icon>
            <span class="text-h6 font-weight-light">ລາຍການແຈ້ງເຕີມ</span>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            ຈຳນວນ {{ loadData.length }} ລາຍການ
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Customer</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-heart </v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1"> mdi-share-variant </v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto" color="#ff66ff" dark max-width="400">
          <v-card-title>
            <v-icon large left> mdi-chat </v-icon>
            <span class="text-h6 font-weight-light">ລາຍການແຈ້ງຖອນ</span>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            ຈຳນວນ {{ loadData.length }} ລາຍການ
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Customer</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-heart </v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1"> mdi-share-variant </v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto" color="#aa80ff" dark max-width="400">
          <v-card-title>
            <v-icon large left> mdi-note-plus </v-icon>
            <span class="text-h6 font-weight-light">ລາຍການສັ່ງຊື້</span>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            ຈຳນວນ {{ loadData.length }} ລາຍການ
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Customer</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon class="mr-1"> mdi-heart </v-icon>
                <span class="subheading mr-2">256</span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1"> mdi-share-variant </v-icon>
                <span class="subheading">45</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: 'auths',
  data: () => {
    return {
      loadData: [],
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isloading = true
      await this.$axios
        .get('/chat_f')
        .then((res) => {
          console.log('Data: ' + res.data)
          this.loadData = res.data.map((el) => {
            console.log('EL: ' + el.id)
            return {
              chat_id: el.id,
              chat_msg_type: el.msg_type,
              chat_message: el.chat_message,
              chat_user_id: el.user_id,
              chat_chat_isread: el.chat_isread.toString().includes('0')
                ? 'ຍັງ'
                : 'ອ່ານແລ້ວ',
              chat_chat_date_time: el.chat_date_time.replaceAll('T', ' '),
              chat_bank_acc_id: el.bank_acc_id,
              chat_bank_acc_name: el.bank_acc_name,
              chat_bank_id: el.bank_id,
              chat_bank_name: el.bank_name,
              chat_cus_name: el.cus_name,
              chat_cus_tel: el.cus_tel,
              chat_function: el.id,
            }
          })

          console.log('AFTER MAP: ' + this.loadData[0].chat_id)
        })
        .catch((er) => {
          console.log('Data: ' + er)
        })
      this.isloading = false
    },
  },
}
</script>
