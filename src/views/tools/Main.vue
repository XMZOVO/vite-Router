<template>
  <div class="flex w-full sm:flex-row flex-col space-x-0 space-y-8 sm:space-y-0 sm:space-x-5">

    <div class="w-full md:w-1/2 rounded-lg shadow-lg 2xl:w-1/3">
      <!-- 卡片头 -->
      <div class="flex items-center justify-between p-5">
        <div class="inline-flex items-center">
          <img src="/zeplin.svg" class="w-10 h-10"/>
          <p class="ml-2">Dat2Csv</p>
        </div>
      </div>
      <!-- 卡片中 -->
      <div class=" text-sm mb-6 px-5">历史遗留.Dat转换.Csv文件，指定能量区间与道址。</div>
      <!-- 卡片脚 -->
      <div class="border-t text-right items-center py-3 px-5">
        <router-link to="/dat2csv" class="text-sm text-main-unactive">
         前往
        </router-link> 
      </div>
    </div>

    <div class="w-full md:w-1/2 rounded-lg shadow-lg 2xl:w-1/3">
      <!-- 卡片头 -->
      <div class="flex items-center justify-between p-5">
        <div class="inline-flex items-center">
          <img src="/github.svg" class="w-10 h-10"/>
          <p class="ml-2">Dat2Csv</p>
        </div>
      </div>
      <!-- 卡片中 -->
      <div class=" text-sm mb-6 px-5">JSRoot</div>
      <!-- 卡片脚 -->
      <div class="border-t text-right items-center py-3 px-5">
        <router-link to="/jsroot" class="text-sm text-main-unactive">
         前往
        </router-link> 
      </div>
    </div>
  </div>

  <!-- <div class="card-grid">
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="../../../../public/zeplin.svg" />
          </span>
          <h3>Dat2Csv</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>历史遗留.Dat转换.Csv文件，指定能量区间与道址。</p>
      </div>
      <div class="card-footer">
        <router-link to="/dat2csv">前往</router-link>
      </div>
    </article>

    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="../../../../public/github.svg" />
          </span>
          <h3>Test</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>测试页</p>
      </div>
      <div class="card-footer">
        <router-link to="/test">前往</router-link>
      </div>
  </article>-->

  <!-- <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/github.svg" />
          </span>
          <h3>GitHub</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Link pull requests and automate workflows.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/figma.svg" />
          </span>
          <h3>Figma</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Embed file previews in projects.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/zapier.svg" />
          </span>
          <h3>Zapier</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Build custom automations and integrations with apps.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/notion.svg" />
          </span>
          <h3>Notion</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Embed notion pages and notes in projects.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/slack.svg" />
          </span>
          <h3>Slack</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Send notifications to channels and create projects.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/zendesk.svg" />
          </span>
          <h3>Zendesk</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Link and automate Zendesk tickets.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/jira.svg" />
          </span>
          <h3>Atlassian JIRA</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Plan, track, and release great software.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/dropbox.svg" />
          </span>
          <h3>Dropbox</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Everything you need for work, all in one place.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/google-chrome.svg" />
          </span>
          <h3>Google Chrome</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Link your Google account to share bookmarks across your entire team.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/discord.svg" />
          </span>
          <h3>Discord</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" checked />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Keep in touch with your customers without leaving the app.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
    </article>
    <article class="card">
      <div class="card-header">
        <div>
          <span>
            <img src="https://assets.codepen.io/285131/google-drive.svg" />
          </span>
          <h3>Google Drive</h3>
        </div>
        <label class="toggle">
          <input type="checkbox" />
          <span></span>
        </label>
      </div>
      <div class="card-body">
        <p>Link your Google account to share files across your entire team.</p>
      </div>
      <div class="card-footer">
        <a href="#">View integration</a>
      </div>
  </article>-->
  <!-- </div> -->
</template>