import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Button from './components/common/Button';
import Card from './components/common/Card';
import './styles/main.css';

const App = () => {
  return (
    <div className="app">
      <Header />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
            AI Search Visibility Optimizer
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', maxWidth: '800px', margin: '0 auto 2rem' }}>
            Optimize your website content for AI search engines and increase your visibility in the age of AI.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Button variant="primary" size="lg">Get Started</Button>
            <Button variant="secondary" size="lg">Learn More</Button>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Key Features</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Card>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>AI Query Simulation</h3>
              <p>Simulate how AI assistants interpret and retrieve information about your products.</p>
            </Card>

            <Card>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Content Analysis</h3>
              <p>Evaluate how well your product descriptions perform in conversational contexts.</p>
            </Card>

            <Card>
              <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>Entity Enhancement</h3>
              <p>Identify how products connect to related concepts, use cases, and problems they solve.</p>
            </Card>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Ready to optimize for AI?</h2>
          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" size="lg">Start Free Trial</Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
