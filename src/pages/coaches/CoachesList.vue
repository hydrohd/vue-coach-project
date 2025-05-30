<script lang="js">

import CoachItem from '@/components/coaches/CoachItem.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import CoachFilter from '@/components/coaches/CoachFilter.vue';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';
import BaseCard from '../../components/ui/BaseCard.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';

export default {
  components: { BaseDialog, BaseSpinner, CoachFilter, BaseButton, CoachItem, BaseCard },
  data () {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      },
      isLoading: false,
      error: null,
    }
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const allCoaches = this.$store.getters['coaches/coaches'];
      return allCoaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    }
  },
  created () {
    this.loadCoaches();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters =  updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');

      }catch(error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  }

};
</script>

<template>
  <base-dialog :show="!!error" title="Error Occured" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>

  <section>
    <base-card>
      <div class="controls mx-auto">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach && !isLoading" link to="/register">Register as Coach</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item v-for="coach in filteredCoaches" :id="coach.id" :key="coach.id"
                    :areas="coach.areas" :first-name="coach.firstName" :last-name="coach.lastName"
                    :rate="coach.hourlyRate"></coach-item>
      </ul>
      <h3 v-else>No Coaches Found</h3>
    </base-card>
  </section>

</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>